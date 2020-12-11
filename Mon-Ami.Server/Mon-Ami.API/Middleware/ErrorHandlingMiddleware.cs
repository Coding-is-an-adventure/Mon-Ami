﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Application.ErrorHandlers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Mon_Ami.API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(
            RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await HandleExeptionAsync(context, exception, _logger);
            }
        }

        private async Task HandleExeptionAsync(HttpContext context, Exception exception, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            switch (exception)
            {
                case RestException re:
                    logger.LogError(exception, "REST error");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                    break;
                case Exception e:
                    logger.LogError(exception, "Server Error");
                    errors = string.IsNullOrEmpty(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            context.Response.ContentType = "application/json";

            if (errors != null)
            {
                var result = JsonSerializer.Serialize(new { errors });

                await context.Response.WriteAsync(result);
            }
        }
    }
}

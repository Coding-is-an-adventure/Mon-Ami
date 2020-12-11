using System;
using System.Net;

namespace API.Application.ErrorHandlers
{
    public class RestExeption : Exception
    {
        private readonly HttpStatusCode _code;
        private readonly object _errors;

        public RestExeption(HttpStatusCode code, object errors = null)
        {
            _code = code;
            _errors = errors;
        }
    }
}

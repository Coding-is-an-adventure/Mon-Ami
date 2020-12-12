using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Mon_Ami.API
{
    public class Program
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.SpacingRules", "SA1005:Single line comments should begin with single space", Justification = "These comments are only used for commenting out code.")]
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            //Inputs test values into the database. Don't use this in production!!
            //IHost host = CreateHostBuilder(args).Build();
            //using (IServiceScope scope = host.Services.CreateScope())
            //{
            //    IServiceProvider services = scope.ServiceProvider;

            //    try
            //    {
            //        DataContext context = services.GetRequiredService<DataContext>();

            //        // Auto applies the latest database migrations
            //        context.Database.Migrate();

            //        // Auto seeds the database with sample data.
            //        Seed.SeedDate(context);
            //    }
            //    catch (Exception exception)
            //    {
            //        ILogger logger = services.GetRequiredService<ILogger<Program>>();
            //        logger.LogError(exception, "An error occured during the database migration");
            //    }
            //}
            //host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

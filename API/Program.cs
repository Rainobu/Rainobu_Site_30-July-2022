using System;
using System.IO;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        //mark update
    //     public static async Task Main(string[] args)
    //     {
    //         var host = CreateHostBuilder(args).Build();
    //         using var scope = host.Services.CreateScope();
    //         var services = scope.ServiceProvider;
    //         try
    //         {
    //             var context = services.GetRequiredService<DataContext>();
    //             var userManager = services.GetRequiredService<UserManager<AppUser>>();
    //             var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    //             await context.Database.MigrateAsync();
    //             await Seed.SeedUsers(userManager,roleManager);
    //         }
    //         catch(Exception ex)
    //         {
    //             var logger = services.GetRequiredService<ILogger<Program>>();
    //             logger.LogError(ex,"An error occurred during migration");
    //         }
    //         await host.RunAsync();
    //     }
        
    //     public static IHostBuilder CreateHostBuilder(string[] args) =>
    //         Host.CreateDefaultBuilder(args)
    //             .ConfigureWebHostDefaults(webBuilder =>
    //             {
    //                 webBuilder.UseStartup<Startup>();
    //             });
    // }
       public static void Main(string[] args)
        {
        var config = new ConfigurationBuilder().AddCommandLine(args).Build();
        var host = new WebHostBuilder()
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseConfiguration(config)
            .UseIISIntegration()
            .UseStartup<Startup>()
            .Build();

        host.Run();
        }
    }
}

  

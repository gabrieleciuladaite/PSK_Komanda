using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.ItemBundles;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using AutoMapper;
using Persistence;
using FluentValidation.AspNetCore;
using API.MIddleware;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using API.Services;
using Serilog;

namespace API
{
    public class Startup
    {
        public IConfiguration _config {get; }
        readonly string CorsConfig = "_CorsConfig";
        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddCors(o => o.AddPolicy(CorsConfig, builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            var test = _config["log_file"];

            services.AddControllers()
            .AddFluentValidation(config => 
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            } );
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            services.AddTransient<IEmailSender, EmailService>();
            services.Configure<AuthMessageSenderOptions>(_config);
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (true/*env.IsDevelopment()*/)
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v2"));
            }

            app.UseHttpsRedirection();

            loggerFactory.AddFile(_config.GetValue(typeof(string), "log_file").ToString());

            app.UseRouting();

            app.UseCors(CorsConfig);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

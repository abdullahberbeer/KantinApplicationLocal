using FluentValidation.AspNetCore;
using KantinAPI.Business.Abstract;
using KantinAPI.Business.Concrete;
using KantinAPI.Data;
using KantinAPI.Data.Abstract;
using KantinAPI.Data.Concrete.EfCore;
using KantinAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace KantinAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<KantinContext>(conf=> {
                //conf.UseSqlServer(Configuration.GetConnectionString("MsSqlConnection"));
                
                conf.UseSqlite("Data Source=kantin.db");
            });
            //services.AddIdentity<User, Role>(options => {
            //    options.User.AllowedUserNameCharacters = "abcçdefgðhýijklmnoöprsþtuüvyzqwxABCÇDEFGÐHIÝJKLMNOÖPRSÞTUÜVYZQWX1234567890!'^+%&/()=?_*->|<@#${[]}";


            //}).AddEntityFrameworkStores<KantinContext>().AddDefaultTokenProviders();
            services.AddIdentity<User, Role>().AddEntityFrameworkStores<KantinContext>();
            services.Configure<IdentityOptions>(options => {

                options.Password.RequireDigit = true; // sayýsal deðer
                options.Password.RequireUppercase = true;//büyük harf
                options.Password.RequireNonAlphanumeric = true;//-+/., harf
                options.Password.RequiredLength = 6;//en az 6 karakter

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);//5 dk hesap kilitlenmesi
                options.Lockout.MaxFailedAccessAttempts = 5;//5denemeden sonra
                options.Lockout.AllowedForNewUsers = true;//hesabý yeni oluþturanýn kitlenip kitlenmeyeceði

                // options.User.AllowedUserNameCharacters="abcd1234";//parola içinde girebileceðimiz harf ve sayýlar
                options.User.RequireUniqueEmail = true; //her bir kayýt farklý email olacak
            });

            services.AddScoped<ICategoryRepository, EfCategoryRepository>();
            services.AddScoped<IProductRepositroy, EfProductRepository>();
            services.AddScoped<IBasketRepository, EfBasketRepository>();
            services.AddScoped<IOrderRepository, EfOrderRepository>();
            services.AddScoped<IPersonRepository, EfPersonRepository>();

            services.AddScoped<ICategoryService, CategoryManager>();
            services.AddScoped<IProductService, ProductManager>();
            services.AddScoped<IBasketService, BasketManager>();
            services.AddScoped<IOrderService, OrderManager>();
            services.AddScoped<IPersonService, PersonManager>();

            services.AddAutoMapper(typeof(Startup));
            services.AddControllers().AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
            //services.AddCors(options => {
            //    options.AddPolicy(
            //        name: MyAllowOrigns,
            //        builder => {
            //            builder.WithOrigins("http://datcakantin.akronsoft.online", "https://datcakantin.akronsoft.online").
            //          AllowAnyMethod().AllowAnyHeader();
            //        }
            //    );
            //});
       //     services.AddCors(options =>
       //options.AddPolicy("myclients", builder =>
       //    builder.WithOrigins("http://datcakantin.akronsoft.online","http://localhost:4200")
       //    .AllowAnyHeader().AllowAnyMethod()
       //    ));
            services.AddCors(options =>
      options.AddPolicy("myclients", builder =>
          builder.WithOrigins("http://localhost:4200")
          .AllowAnyHeader().AllowAnyMethod()
          ));
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.RequireHttpsMetadata = false;
                opt.SaveToken = true;
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Secret").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KantinAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,UserManager<User> userManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                SeedDatabase.Seed(userManager,Configuration).Wait();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "KantinAPI v1"));
            }
            else
            {
                app.UseExceptionHandler(appError => {
                    appError.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json";
                        var exception = context.Features.Get<IExceptionHandlerFeature>();
                        if (exception != null)
                        {
                            await context.Response.WriteAsync(new ErrorDetail()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = exception.Error.Message
                            }.ToString());
                        }
                    });
                });
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("myclients");


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;

namespace Infrastructure.Security
{
    public class CookieAccessor : ICookieAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CookieAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string getCookie()
        {
            var value ="";
            _httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("CART_SESSION", out value);
            return value;
        }
 
        public string generateCookie(Guid id)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This should and will be removed!"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var claim = new List<Claim>{new Claim(ClaimTypes.NameIdentifier, id.ToString())};

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);


            var CookieOptions = new CookieOptions();
            CookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(7));

            _httpContextAccessor.HttpContext.Response.Cookies.Append("CART_SESSION", tokenHandler.WriteToken(token),
                                                                    CookieOptions);

            return tokenHandler.WriteToken(token);
        }
    }
}
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using System;
using System.Linq;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Web;
using PasswordGenerator;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<UserController> _logger;
        public UserController(UserManager<User> userManager,
        SignInManager<User> signInManager, TokenService tokenService,
        
        DataContext context, IEmailSender emailSender, ILogger<UserController> logger)
        {
            _logger = logger;
            _emailSender = emailSender;
            _context = context;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;

        }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        _logger.LogInformation("[" + DateTime.Now.ToString() + "] LOGIN USER " + loginDto.Email);
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (result.Succeeded)
        {
            return CreateUserObject(user);
        }

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("confirm/{id}/token/{token}")]
    public async Task<ActionResult> ConfirmUser(string token, string id)
    {
        var newToken = HttpUtility.UrlDecode(token);
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            _logger.LogInformation("[" + DateTime.Now.ToString() + "] CONFIRM REGISTRATION USER " + user.Email);
            var verification = await _userManager.ConfirmEmailAsync(user, newToken);
            if (verification.Succeeded)
            {
                return base.Content("User " + user.UserName + " verified!", "html/text");
            }
            string test = "";
            foreach (var element in verification.Errors)
            {
                test += element.ToString();
            }
            return base.Content("User " + user.UserName + " failed to verify! : " + test, "html/text");
        }

        return base.Content("User failed to verify!", "html/text");

    }

    [AllowAnonymous]
    [HttpGet("forgot/{email}")]
    public async Task<ActionResult> SendForgotPassword(string email)
    {
        var newEmail = HttpUtility.UrlDecode(email);
        var user = await _userManager.FindByEmailAsync(email);
        _logger.LogInformation("[" + DateTime.Now.ToString() + "] FORGOT PASSWORD USER " + user.Email);
        if (user == null) return BadRequest("User not found!");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var url = HttpContext.Request.Host.Host + ":" +
                          HttpContext.Request.Host.Port + "/api/user/reset/" + user.Id + "/token/" + HttpUtility.UrlEncode(token);

        await _emailSender.SendEmailAsync(user.Email, "Reset password", "Password reset confirmation link: " + url + "");

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("reset/{id}/token/{token}")]
    public async Task<ActionResult> ResetPassword(string token, string id)
    {
        var newToken = HttpUtility.UrlDecode(token);
        var user = await _userManager.FindByIdAsync(id);

        
        if (user != null)
        {
            _logger.LogInformation("[" + DateTime.Now.ToString() + "] RESET PASSWORD USER " + user.Email);
            var pwd = new Password(includeLowercase: true, includeUppercase: true, includeNumeric: true, includeSpecial: true, passwordLength: 21);
            var password = pwd.Next();
            var change = await _userManager.ResetPasswordAsync(user, newToken, password);
            if (change.Succeeded)
            {
                await _emailSender.SendEmailAsync(user.Email, "New password", "New password: " + password);
                return Ok();
            }
            string test = "";
            foreach (var element in change.Errors)
            {
                test += element.ToString();
            }
            return base.Content("User " + user.UserName + " failed to change password! : " + test, "html/text");
        }

        return base.Content("User failed to change password!", "html/text");
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        _logger.LogInformation("[" + DateTime.Now.ToString() + "] REGISTER USER " + registerDto.Email);
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            return BadRequest("Email already used!");
        }
        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
        {
            return BadRequest("Username already used!");
        }

        var user = new User
        {
            Email = registerDto.Email,
            UserName = registerDto.Username,
            UserRole = Role.user,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            PhoneNumber = registerDto.PhoneNumber,
        };

        var address = new Address
        {
            AddressId = Guid.NewGuid(),
            AddressName = "Default",
            City = registerDto.City,
            PostCode = registerDto.PostalCode,
            ApartmentNumber = registerDto.ApartmentNumber,
            AddressNumber = registerDto.AddressNumber,
            Street = registerDto.Street,
            UserId = user.Id,
            User = user
        };

        user.Addresses.Add(address);

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            var result_2 = await _userManager.UpdateAsync(user);

            if (result_2.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var url = HttpContext.Request.Host.Host + ":" +
                          HttpContext.Request.Host.Port + "/api/user/confirm/" + user.Id + "/token/" + HttpUtility.UrlEncode(token);

                await _emailSender.SendEmailAsync(user.Email, "ConfirmUser", "confirmation link: " + url);
                return CreateUserObject(user);
            }
        }

        return BadRequest("Problem registering the user!");
    }

    [Authorize]
    [HttpPost("register/seller")]
    public async Task<ActionResult<UserDto>> RegisterSeller(RegisterDto registerDto)
    {
        var registrar = await _userManager
            .FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        if (registrar == null) return Unauthorized();

        if (registrar.UserRole == Role.seller)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email already used!");
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username already used!");
            }

            var user = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                UserRole = Role.seller,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
            };
            _logger.LogInformation("[" + DateTime.Now.ToString() + "] REGISTER SELLER " + user.Email);
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
        }

        return Unauthorized("Problem registering the seller user!");
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<UserDto>> ChangeUserDetails(UserUpdateDto userInfo)
    {

        var user = await _userManager
            .FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        if (user == null) return Unauthorized();

        _logger.LogInformation("[" + DateTime.Now.ToString() + "] CHANGE DETAILS USER " + user.Email);

        user.FirstName = userInfo.FirstName;
        user.LastName = userInfo.LastName;

        await _userManager.UpdateAsync(user);

        return CreateUserObject(user);
    }


    [Authorize]
    [HttpPut("changepassword")]
    public async Task<ActionResult<UserDto>> ChangeUserPassword(ChangePasswordDto userInfo)
    {
        var user = await _userManager.FindByEmailAsync(userInfo.Email);

        if (user == null) return Unauthorized();

        _logger.LogInformation("[" + DateTime.Now.ToString() + "] CHANGE PASSWORD USER " + user.Email);

        var result = await _signInManager.CheckPasswordSignInAsync(user, userInfo.Password, false);

        if (result.Succeeded)
        {
            string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            IdentityResult passwordChangeResult = await _userManager.ResetPasswordAsync(user, resetToken, userInfo.NewPassword);

            if (passwordChangeResult.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Failed to change the password!");

        }

        return BadRequest("Problem changing the password!");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {

        var user = await _userManager
            .FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        _logger.LogInformation("[" + DateTime.Now.ToString() + "] GET CURRENT USER " + user.Email);

        return CreateUserObject(user);
    }

    [Authorize]
    [HttpGet("users")]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var requestor = await _userManager
            .FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        _logger.LogInformation("[" + DateTime.Now.ToString() + "] GET ALL USERS USER" + requestor.Email);

        if (requestor == null) return Unauthorized();

        if (requestor.UserRole == Role.seller)
        {
            var users = await _userManager.Users.ToListAsync();

            if (users != null)
            {
                List<UserDto> UserDtos = new List<UserDto>();

                foreach (var user in users)
                {
                    var userDto = new UserDto
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Username = user.UserName,
                        Addresses = CreateUserAddresses(user),
                        Role = user.UserRole
                    };

                    UserDtos.Add(userDto);
                }

                return UserDtos;
            }

            return BadRequest("Problem loading the users!");
        }

        return BadRequest("Problem with requestor!");
    }


    private UserDto CreateUserObject(User user)
    {
        return new UserDto
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Username = user.UserName,
            PhoneNumber  = user.PhoneNumber,
            Addresses = CreateUserAddresses(user),
            Token = _tokenService.CreateToken(user),
            Role = user.UserRole
        };
    }

    private ICollection<AddressDto> CreateUserAddresses(User user)
    {
        var newAddresses = new List<AddressDto> { };
        var addresses = _context.Addresses.Where(u => u.UserId == user.Id).ToList();

        foreach (var address in addresses)
        {
            var holder = new AddressDto
            {
                AddressId = address.AddressId,
                AddressName = address.AddressName,
                City = address.City,
                PostCode = address.PostCode,
                ApartmentNumber = address.ApartmentNumber,
                AddressNumber = address.AddressNumber,
                Street = address.Street,
                Notes = address.Notes
            };

            newAddresses.Add(holder);
        }

        return newAddresses;
    }
}
}
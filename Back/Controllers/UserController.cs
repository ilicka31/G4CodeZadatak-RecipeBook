using Back.DTOs;
using Back.DTOs.User;
using Back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
         //   userRegisterDTO.UserRole = Models.Role.USER;
            try
            {
                return Ok(await _userService.Register(userRegisterDTO));
            }
            catch (Exception e)
            {

                return Conflict(e.Message);
            }

        }

        [Authorize(Roles ="ADMIN")]
        [HttpPost("add-cook")]
        public async Task<IActionResult> AddCook(UserRegisterDTO userRegisterDTO)
        {
            userRegisterDTO.UserRole = Models.Role.COOK;
            try
            {
                return Ok(await _userService.AddCook(userRegisterDTO));
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }
        [Authorize(Roles = "ADMIN")]
        [HttpGet("all-cooks")]
        public async Task<IActionResult> Cooks()
        {
            try
            {
                return Ok(await _userService.GetAllCooks());
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }
        [HttpGet("users")]
        public async Task<IActionResult> AllUsers()
        {
            try
            {
                return Ok(await _userService.GetAll());
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            TokenDTO token = new TokenDTO();
            try
            {
                token= await _userService.Login(userLoginDTO);
                
            }
            catch (Exception e)
            {
                return Conflict(e.Message);
            }
            return Ok(token);
        }
    }
}

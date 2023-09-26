using AutoMapper;
using Back.DTOs;
using Back.DTOs.User;
using Back.Models;
using Back.Repositories.Interfaces;
using Back.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _secretKey = configuration.GetSection("SecretKey");
        }
        public int GetUserId(ClaimsPrincipal claim)
        {
            return int.Parse(claim.Claims.First(i => i.Type == "UserID").Value);
        }
        public async Task<UserGetDTO> AddCook(UserRegisterDTO cook)
        {
            var user = await _userRepository.GetByEmail(cook.Email);
            if (user != null)
            {
                throw new Exception("User with this email already exist!");
            }

            User newUser = _mapper.Map<User>(cook);
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            //     newUser.UserRole = Role.COOK;
            await _userRepository.AddCook(newUser);
            return _mapper.Map<UserGetDTO>(newUser);
        }

        public async Task<List<UserGetDTO>> GetAll()
        {
            return _mapper.Map<List<UserGetDTO>>(await _userRepository.GetAll());
        }

        public async Task<List<UserGetDTO>> GetAllCooks()
        {
            return _mapper.Map<List<UserGetDTO>>(await _userRepository.GetAllCooks());
        }

        public async Task<TokenDTO> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _userRepository.GetByEmail(userLoginDTO.Email);
            if (user == null)
            {
                throw new Exception("User with these credentials does not exist!");
            }
            if (!BCrypt.Net.BCrypt.Verify(userLoginDTO.Password, user.Password))
            {
                throw new Exception("Wrong password!");
            }

            List<Claim> userClaims = new List<Claim>();
            if (user.UserRole.ToString() == "ADMIN")
            {
                userClaims.Add(new Claim(ClaimTypes.Role, "ADMIN"));
            }
            else if (user.UserRole.ToString() == "COOK")
            {
                userClaims.Add(new Claim(ClaimTypes.Role, "COOK"));
            }
            else
            {
                userClaims.Add(new Claim(ClaimTypes.Role, "USER"));
            }
            userClaims.Add(new Claim("UserID", user.UserId.ToString()));
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:37767",
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials
                );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return new TokenDTO() { Token = tokenString, UserRole = user.UserRole.ToString() };
        }

        public async Task<UserGetDTO> Register(UserRegisterDTO userRegisterDTO)
        {
            var user = await _userRepository.GetByEmail(userRegisterDTO.Email);
            if (user != null)
            {
                throw new Exception("User with this email already exist!");
            }
          
            User newUser = _mapper.Map<User>(userRegisterDTO);
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
       //     newUser.UserRole = Role.USER;
            await _userRepository.Register(newUser);
            return _mapper.Map<UserGetDTO>(newUser);
        }
    }
}

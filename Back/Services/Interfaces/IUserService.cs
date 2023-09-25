using Back.DTOs.User;
using System.Security.Claims;

namespace Back.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserGetDTO> AddCook(UserRegisterDTO cook);
        Task<List<UserGetDTO>> GetAllCooks();
        Task<List<UserGetDTO>> GetAll();
        Task<UserGetDTO> Register(UserRegisterDTO userRegisterDTO);
        Task<string> Login(UserLoginDTO userLoginDTO);
        int GetUserId(ClaimsPrincipal claim);

    }
}

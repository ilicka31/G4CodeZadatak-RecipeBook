using Back.DTOs.User;

namespace Back.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserGetDTO> AddCook(UserRegisterDTO cook);
        Task<List<UserGetDTO>> GetAllCooks();
        Task<UserGetDTO> Register(UserRegisterDTO userRegisterDTO);
        Task<string> Login(UserLoginDTO userLoginDTO);

    }
}

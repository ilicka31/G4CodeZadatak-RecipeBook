using Back.DTOs.User;
using Back.Models;

namespace Back.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddCook(User cook);
        Task<List<User>> GetAllCooks();
        Task<List<User>> GetAll();
        Task<User> GetByEmail(string email);
        Task<User> Register(User user);

    }
}

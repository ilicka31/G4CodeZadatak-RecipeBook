using Back.Models;

namespace Back.DTOs.User
{
    public class UserGetDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role UserRole { get; set; }
    }
}

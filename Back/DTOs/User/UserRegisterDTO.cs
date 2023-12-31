﻿using Back.Models;

namespace Back.DTOs.User
{
    public class UserRegisterDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role UserRole { get; set; }
    }
}

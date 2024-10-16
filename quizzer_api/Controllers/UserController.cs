using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using quizzer_api.Models;
using System.Data.SqlClient;
using System.Text;

namespace quizzer_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("viewUser")]
        public IActionResult viewUser()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("QuizCon")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT * FROM USERS_DATA", con))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();
                        List<Registration> users = new List<Registration>();

                        while (reader.Read())
                        {
                            Registration user = new Registration
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("USER_ID")),
                                Name = reader.GetString(reader.GetOrdinal("USER_NAME")),
                                Email = reader.GetString(reader.GetOrdinal("USER_EMAIL")),
                                Password = reader.GetString(reader.GetOrdinal("USER_PASSWORD")),
                                Role = reader.GetString(reader.GetOrdinal("USER_ROLE"))
                            };
                            users.Add(user);
                        }

                        return Ok(users);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("registration")]
        public string Registration(Registration reg)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("QuizCon")))
                {
                    con.Open();
                    string query = "INSERT INTO USERS_DATA (USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE) VALUES (@Name, @Email, @Password, @Role)";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Name", reg.Name);
                        cmd.Parameters.AddWithValue("@Email", reg.Email);
                        cmd.Parameters.AddWithValue("@Password", reg.Password);
                        cmd.Parameters.AddWithValue("@Role", reg.Role);

                        int i = cmd.ExecuteNonQuery();
                        return (i > 0) ? "User Added" : "Error while adding user.";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(string email, string password)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("QuizCon")))
                {
                    con.Open();
                    string query = "SELECT * FROM USERS_DATA WHERE USER_EMAIL = @Email AND USER_PASSWORD = @Password";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Email", email);
                        cmd.Parameters.AddWithValue("@Password", password);

                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader.HasRows)
                        {
                            return Ok("Login successful");
                        }
                        else
                        {
                            return Unauthorized("Invalid credentials");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("editUser/{id}")]
        public string EditUser(int id, Registration updatedUser)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("QuizCon")))
                {
                    con.Open();
                    string query = "UPDATE USERS_DATA SET USER_NAME = @Name, USER_EMAIL = @Email, USER_PASSWORD = @Password, USER_ROLE = @Role WHERE USER_ID = @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Name", updatedUser.Name);
                        cmd.Parameters.AddWithValue("@Email", updatedUser.Email);
                        cmd.Parameters.AddWithValue("@Password", updatedUser.Password);
                        cmd.Parameters.AddWithValue("@Role", updatedUser.Role);
                        cmd.Parameters.AddWithValue("@UserId", id);

                        int i = cmd.ExecuteNonQuery();
                        return (i > 0) ? "User Updated Successfully" : "Error while updating user.";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        [HttpDelete]
        [Route("deleteUser/{id}")]
        public string DeleteUser(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("QuizCon")))
                {
                    con.Open();
                    string query = "DELETE FROM USERS_DATA WHERE USER_ID = @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@UserId", id);

                        int i = cmd.ExecuteNonQuery();
                        return (i > 0) ? "User Deleted Successfully" : "Error while deleting user.";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
    }
}

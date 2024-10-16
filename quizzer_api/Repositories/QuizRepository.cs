using quizzer_api.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace quizzer_api.Repositories 
{
    public class QuizRepository
    {
        private readonly string _connectionString;

        public QuizRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void InsertQuiz(string quizName, string quizDescription)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "INSERT INTO QUIZ (QUIZ_NAME, QUIZ_DESCRIPTION) VALUES (@QuizName, @QuizDescription)";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@QuizName", quizName);
                    cmd.Parameters.AddWithValue("@QuizDescription", quizDescription);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Quiz> GetAllQuizzes()
        {
            List<Quiz> quizzes = new List<Quiz>();

            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM QUIZ";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Quiz quiz = new Quiz
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("ID")),
                            QuizName = reader.GetString(reader.GetOrdinal("QUIZ_NAME")),
                            QuizDescription = reader.IsDBNull(reader.GetOrdinal("QUIZ_DESCRIPTION")) ? null : reader.GetString(reader.GetOrdinal("QUIZ_DESCRIPTION"))
                        };
                        quizzes.Add(quiz);
                    }
                }
            }

            return quizzes;
        }
    }
}


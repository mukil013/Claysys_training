using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace quizzer_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly string _connectionString = "QuizCon";

        //[HttpPost]
        //[Route("insertQuiz")]
        //public IActionResult InsertQuiz(string quizName, string quizDescription)
        //{
        //    try
        //    {
        //        QuizRepository quizRepo = new QuizRepository(_connectionString);
        //        quizRepo.InsertQuiz(quizName, quizDescription);
        //        return Ok("Quiz inserted successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet]
        //[Route("getAllQuizzes")]
        //public IActionResult GetAllQuizzes()
        //{
        //    try
        //    {
        //        //QuizRepository quizRepo = new QuizRepository(_connectionString);
        //        //List<Quiz> quizzes = quizRepo.GetAllQuizzes();
        //        //return Ok(quizzes);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}

CREATE TABLE USERS_DATA(
    USER_ID INT PRIMARY KEY IDENTITY(1,1),
    USER_NAME NVARCHAR(100),
    USER_EMAIL NVARCHAR(100),
    USER_PASSWORD NVARCHAR(255),
    USER_ROLE VARCHAR(10)
);

CREATE TABLE QUIZ(
    ID INT PRIMARY KEY IDENTITY(1,1),
    QUIZ_NAME NVARCHAR(255) NOT NULL,
    QUIZ_DESCRIPTIION NVARCHAR(255)
);

CREATE TABLE QUESTIONS(
    QUESTION NVARCHAR(255) NOT NULL,
    TOTAL_OPTIONS NVARCHAR(255) NOT NULL,
    CORRECT_ANSWER NVARCHAR(50) NOT NULL,
    MARK_FOR_THE_QUESTION INT NOT NULL,
    QUIZ_ID INT NOT NULL,
    OPTIONS NVARCHAR(255),
    FOREIGN KEY (QUIZ_ID) REFERENCES QUIZ(ID)
);

CREATE TABLE COURSE_ATTEMPT(
    ATTEMPT_USER_ID INT NOT NULL,
    QUIZ_ID INT NOT NULL,
    TOTAL_MARK INT,
    FOREIGN KEY (ATTEMPT_USER_ID) REFERENCES USERS_DATA(USER_ID),
    FOREIGN KEY (QUIZ_ID) REFERENCES QUIZ(ID)
);

GO

CREATE PROCEDURE ADD_USERS
@NAME NVARCHAR(50),
@EMAIL NVARCHAR(50),
@PASSWORD NVARCHAR(255),
@ROLE VARCHAR(10)
AS
BEGIN
    INSERT INTO USERS_DATA (USER_EMAIL, USER_NAME, USER_PASSWORD, USER_ROLE) 
    VALUES(@EMAIL, @NAME, @PASSWORD, @ROLE);
END;

GO

CREATE PROCEDURE DELETE_USER
@USER_ID INT
AS
BEGIN
    DELETE FROM USERS_DATA WHERE USER_ID = @USER_ID;
END;

GO

CREATE PROCEDURE UPDATE_USER
@USER_ID INT,
@NAME NVARCHAR(50),
@EMAIL NVARCHAR(50),
@PASSWORD NVARCHAR(255),
@ROLE VARCHAR(10)
AS
BEGIN
    UPDATE USERS_DATA 
    SET USER_NAME = @NAME, USER_EMAIL = @EMAIL, USER_PASSWORD = @PASSWORD, USER_ROLE = @ROLE
    WHERE USER_ID = @USER_ID;
END;

GO

CREATE PROCEDURE ADD_QUIZ
@QUIZ_NAME NVARCHAR(255),
@QUIZ_DESCRIPTION NVARCHAR(255)
AS
BEGIN 
    INSERT INTO QUIZ(QUIZ_NAME, QUIZ_DESCRIPTIION) VALUES(@QUIZ_NAME, @QUIZ_DESCRIPTION);
END;

GO

CREATE PROCEDURE DELETE_QUIZ
@QUIZ_ID INT
AS
BEGIN
    DELETE FROM QUIZ WHERE ID = @QUIZ_ID;
END;

GO

CREATE PROCEDURE UPDATE_QUIZ
@QUIZ_ID INT,
@QUIZ_NAME NVARCHAR(255),
@QUIZ_DESCRIPTION NVARCHAR(255)
AS
BEGIN
    UPDATE QUIZ SET QUIZ_NAME = @QUIZ_NAME, QUIZ_DESCRIPTIION = @QUIZ_DESCRIPTION WHERE ID = @QUIZ_ID;
END;

GO

CREATE PROCEDURE ADD_QUESTION
@QUESTION NVARCHAR(255),
@TOTAL_OPTIONS INT,
@CORRECT_OPTION NVARCHAR(50),
@MARK_FOR_THE_QUESTION INT,
@QUIZ_ID INT,
@OPTIONS NVARCHAR(255)
AS
BEGIN
    INSERT INTO QUESTIONS(QUESTION, TOTAL_OPTIONS, CORRECT_ANSWER, MARK_FOR_THE_QUESTION, QUIZ_ID, OPTIONS) 
    VALUES(@QUESTION, @TOTAL_OPTIONS, @CORRECT_OPTION, @MARK_FOR_THE_QUESTION, @QUIZ_ID, @OPTIONS);
END;

GO

CREATE PROCEDURE DELETE_QUESTION
@QUESTION NVARCHAR(255)
AS
BEGIN
    DELETE FROM QUESTIONS WHERE QUESTION = @QUESTION;
END;

GO

CREATE PROCEDURE UPDATE_QUESTION
@QUESTION NVARCHAR(255),
@NEW_QUESTION NVARCHAR(255),
@TOTAL_OPTIONS INT,
@CORRECT_OPTION NVARCHAR(50),
@MARK_FOR_THE_QUESTION INT,
@OPTIONS NVARCHAR(255)
AS
BEGIN
    UPDATE QUESTIONS 
    SET QUESTION = @NEW_QUESTION, TOTAL_OPTIONS = @TOTAL_OPTIONS, CORRECT_ANSWER = @CORRECT_OPTION, MARK_FOR_THE_QUESTION = @MARK_FOR_THE_QUESTION, OPTIONS = @OPTIONS
    WHERE QUESTION = @QUESTION;
END;

GO

CREATE PROCEDURE ADD_COURSE_ATTEMPT
@ATTEMPT_USER_ID INT,
@QUIZ_ID INT,
@TOTAL_MARK INT
AS
BEGIN
    INSERT INTO COURSE_ATTEMPT (ATTEMPT_USER_ID, QUIZ_ID, TOTAL_MARK) 
    VALUES(@ATTEMPT_USER_ID, @QUIZ_ID, @TOTAL_MARK);
END;

GO

CREATE PROCEDURE DELETE_COURSE_ATTEMPT
@ATTEMPT_USER_ID INT,
@QUIZ_ID INT
AS
BEGIN
    DELETE FROM COURSE_ATTEMPT WHERE ATTEMPT_USER_ID = @ATTEMPT_USER_ID AND QUIZ_ID = @QUIZ_ID;
END;

GO

CREATE PROCEDURE UPDATE_COURSE_ATTEMPT
@ATTEMPT_USER_ID INT,
@QUIZ_ID INT,
@TOTAL_MARK INT
AS
BEGIN
    UPDATE COURSE_ATTEMPT SET TOTAL_MARK = @TOTAL_MARK 
    WHERE ATTEMPT_USER_ID = @ATTEMPT_USER_ID AND QUIZ_ID = @QUIZ_ID;
END;

GO

CREATE FUNCTION dbo.GetTotalMarks (@ATTEMPT_USER_ID INT, @QUIZ_ID INT)
RETURNS INT
AS
BEGIN
    DECLARE @TotalMarks INT;
    SELECT @TotalMarks = SUM(TOTAL_MARK)
    FROM COURSE_ATTEMPT
    WHERE ATTEMPT_USER_ID = @ATTEMPT_USER_ID AND QUIZ_ID = @QUIZ_ID;
    
    RETURN ISNULL(@TotalMarks, 0);
END;

GO

CREATE VIEW vw_Users AS
SELECT USER_ID, USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE 
FROM USERS_DATA;

GO

CREATE VIEW vw_Quiz AS
SELECT ID, QUIZ_NAME, QUIZ_DESCRIPTIION 
FROM QUIZ;

GO

CREATE VIEW vw_Questions AS
SELECT QUESTION, TOTAL_OPTIONS, CORRECT_ANSWER, MARK_FOR_THE_QUESTION, QUIZ_ID, OPTIONS 
FROM QUESTIONS;

GO

CREATE VIEW vw_CourseAttempts AS
SELECT ATTEMPT_USER_ID, QUIZ_ID, TOTAL_MARK 
FROM COURSE_ATTEMPT;

GO

EXEC ADD_USERS @NAME = 'Mukil', @EMAIL = 'mukil@123.com', @PASSWORD = '1234', @ROLE = 'admin';
EXEC ADD_USERS @NAME = 'Sam', @EMAIL = 'sam@1234.com', @PASSWORD = '5678', @ROLE = 'user';

EXEC ADD_QUIZ @QUIZ_NAME = 'Maths', @QUIZ_DESCRIPTION = 'This is a math quiz';

EXEC ADD_QUESTION @QUESTION = 'What is 2+2?', @TOTAL_OPTIONS = 4, @CORRECT_OPTION = '4', @MARK_FOR_THE_QUESTION = 10, @QUIZ_ID = 1, @OPTIONS = '1,2,3,4';
EXEC ADD_QUESTION @QUESTION = 'What is 3+3?', @TOTAL_OPTIONS = 4, @CORRECT_OPTION = '6', @MARK_FOR_THE_QUESTION = 10, @QUIZ_ID = 1, @OPTIONS = '3,4,5,6';

EXEC ADD_COURSE_ATTEMPT @ATTEMPT_USER_ID = 1, @QUIZ_ID = 1, @TOTAL_MARK = 20;

SELECT * FROM vw_Users;
SELECT * FROM vw_Quiz;
SELECT * FROM vw_Questions;
SELECT * FROM vw_CourseAttempts;

SELECT * FROM sys.schemas;

SELECT dbo.GetTotalMarks(1, 1) AS TotalMarks;

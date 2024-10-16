USE Quizzer;

-- Create the Users table if it does not exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        UserId INT PRIMARY KEY IDENTITY(1,1),
        UserName NVARCHAR(100),
        UserEmail NVARCHAR(100),
        UserPassword NVARCHAR(255),
        RegisteredDateAndTime DATETIME DEFAULT GETDATE()
    );

	INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES('Mukil', 'mukil@123.com', '1234');
	INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES('Sam', 'sam@123.com', '4321');
	INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES('John', 'john@123.com', 'john123');
	INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES('Aurther', 'aurthur@123.com', 'auth@123');
	INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES('Morgon', 'morgon@123.com', 'morgon#123');
	
	SELECT * FROM Users;
END;
ELSE
BEGIN
	DROP TABLE Users;
END;

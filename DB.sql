CREATE DATABASE myWebApp;
USE myWebApp;
DROP DATABASE IF EXISTS myWebApp;

CREATE TABLE Department (
    DepartmentID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    Department NVARCHAR(50),
    PhoneNumber INT
);

CREATE TABLE Post (
    PostID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    Post BLOB,
    DateTime DATETIME,
    ReplyID INT
);

CREATE TABLE Project (
    ProjectID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    DepartmentID INT,
    ProjectName NVARCHAR(45),
    StartDay DATETIME,
    EndDay DATETIME,
    Progress INT
);

CREATE TABLE Calendar (
    ReminderID INT AUTO_INCREMENT PRIMARY KEY,
    StaffID INT,
    ProjectID INT,
    ReminderDate DATETIME,
    ReminderTitle NVARCHAR(100),
    ReminderContent NVARCHAR(500)
);

CREATE TABLE Documents (
    DocumentID INT AUTO_INCREMENT PRIMARY KEY,
    StaffID INT,
    LaborContract BLOB,
    OtherContract BLOB,
    DepartmentID INT,
    Degree BLOB
);

CREATE TABLE Communication (
    ReplyID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    Reply NVARCHAR(100),
    PostID INT,
    StaffID INT
);

CREATE TABLE Staff (
    StaffID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffName NVARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber NVARCHAR(45),
    DayOfBirth DATETIME,
    DepartmentID INT,
    ProjectID INT,
    ReminderID INT
);

CREATE TABLE Payroll (
    PayrollID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    Salary INT,
    OthereFee INT,
    Bonus INT,
    StartDay DATETIME,
    EndDay DATETIME
);

-- Create the Events table
CREATE TABLE Events (
    EventID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    EventName VARCHAR(255) NOT NULL,
    EventDate DATE NOT NULL,
    EventContent TEXT NOT NULL
);

-- Create the Notices table
CREATE TABLE Notices (
    NoticeID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    NoticeTitle VARCHAR(255) NOT NULL,
    NoticeDate DATE NOT NULL,
    NoticeContent TEXT NOT NULL
);

CREATE TABLE StaffInfo (
    StaffID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    Gender NVARCHAR(10),
    CCCD INT,
    Position NVARCHAR(45),
    Birthplace NVARCHAR(70),
    Nationality NVARCHAR(45),
    Nation NVARCHAR(45),
    Languages NVARCHAR(50),
    CurrentAddress NVARCHAR(100),
    DateOfJoining DATETIME,
    WorkStatus NVARCHAR(45)
);

CREATE TABLE Checkin (
    Check_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    DateOfCheckIn DATETIME,
    NumberOfWorkDay INT,
    NumberOfDayOff INT,
    NumberOfLate INT
);

CREATE TABLE Login (
    LoginID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Request (
	RequestID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    StaffID INT,
    AdminID INT,
    Time DATETIME,
    DepartmentID INT,
    RequestType NVARCHAR(50) NOT NULL,
    RequestTitle NVARCHAR(255) NOT NULL,
    RequestContent NVARCHAR(500),
    RequestState NVARCHAR(20) NOT NULL
);

CREATE TABLE Auth (
	AuthID INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
    AdminID INT,
    Username VARCHAR(20) NOT NULL,
    Password VARCHAR(20) NOT NULL
);

CREATE TABLE Admin (
	AdminID INT AUTO_INCREMENT PRIMARY KEY UNIQUE,
    AuthID INT,
    Email VARCHAR(30)
);

ALTER TABLE Auth 
ADD CONSTRAINT FK_Auth_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);

ALTER TABLE Admin 
ADD CONSTRAINT FK_Admin_AuthID FOREIGN KEY (AuthID) REFERENCES Auth(AuthID);

-- Add foreign key constraints
ALTER TABLE Post
ADD CONSTRAINT FK_Post_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
ADD CONSTRAINT FK_Post_ReplyID FOREIGN KEY (ReplyID) REFERENCES Communication(ReplyID);

ALTER TABLE Project
ADD CONSTRAINT FK_Project_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
ADD CONSTRAINT FK_Project_DepartmentID FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID);

ALTER TABLE Calendar
ADD CONSTRAINT FK_Calendar_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
ADD CONSTRAINT FK_Calendar_ProjectID FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID);

ALTER TABLE Documents
ADD CONSTRAINT FK_Documents_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
ADD CONSTRAINT FK_Documents_Department FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID);

ALTER TABLE Communication
ADD CONSTRAINT FK_Communication_PostID FOREIGN KEY (PostID) REFERENCES Post(PostID),
ADD CONSTRAINT FK_Communication_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);

ALTER TABLE Staff
ADD CONSTRAINT FK_Staff_DepartmentID FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID),
ADD CONSTRAINT FK_Staff_ProjectID FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
ADD CONSTRAINT FK_Staff_ReminderID FOREIGN KEY (ReminderID) REFERENCES Calendar(ReminderID);

ALTER TABLE Payroll
ADD CONSTRAINT FK_Payroll_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);

ALTER TABLE Checkin
ADD CONSTRAINT FK_Checkin_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);

ALTER TABLE Login
ADD CONSTRAINT FK_Login_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID);

ALTER TABLE Request
ADD CONSTRAINT FK_Request_StaffID FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
ADD CONSTRAINT FK_Request_DepartmentID FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID);

-- Insert into Department
INSERT INTO Department (Department, PhoneNumber) VALUES
('HR', '1234567890'),
('IT', '0987654321'),
('Finance', '1122334455'),
('Marketing', '2233445566'),
('Sales', '3344556677'),
('Operations', '4455667788'),
('R&D', '5566778899'),
('Customer Support', '6677889900'),
('Admin', '7788990011');

-- Insert into Staff
INSERT INTO Staff (StaffName, Email, PhoneNumber, DayOfBirth, DepartmentID, ProjectID, ReminderID) VALUES
('John Doe', 'john.doe@example.com', '1234567890', '1980-01-01', 1, 1, 1),
('Jane Smith', 'jane.smith@example.com', '0987654321', '1985-02-02', 2, 2, 2),
('Mike Brown', 'mike.brown@example.com', '1122334455', '1990-03-03', 3, 2, 3),
('Emily Davis', 'emily.davis@example.com', '2233445566', '1992-04-04', 4, 3, 4),
('Sarah Wilson', 'sarah.wilson@example.com', '3344556677', '1988-05-05', 5, 4, 5),
('David Lee', 'david.lee@example.com', '4455667788', '1983-06-06', 6, 4, 6),
('Chris Kim', 'chris.kim@example.com', '5566778899', '1987-07-07', 7, 5, 7),
('Anna Taylor', 'anna.taylor@example.com', '6677889900', '1989-08-08', 8, 7, 8),
('James Anderson', 'james.anderson@example.com', '7788990011', '1991-09-09', 9, 9, 9);

-- Insert into Project
INSERT INTO Project (StaffID, DepartmentID, ProjectName, StartDay, EndDay, Progress) VALUES
(1, 1, 'Project Alpha', '2023-01-01', '2023-12-31', 50),
(2, 2, 'Project Beta', '2023-02-01', '2023-11-30', 70),
(3, 3, 'Project Gamma', '2023-03-01', '2023-10-31', 80),
(4, 4, 'Project Delta', '2023-04-01', '2023-09-30', 60),
(5, 5, 'Project Epsilon', '2023-05-01', '2023-08-31', 90),
(6, 6, 'Project Zeta', '2023-06-01', '2023-07-31', 40),
(7, 7, 'Project Eta', '2023-07-01', '2023-06-30', 30),
(8, 8, 'Project Theta', '2023-08-01', '2023-05-31', 20),
(9, 9, 'Project Iota', '2023-09-01', '2023-04-30', 10);

-- Insert into Calendar
INSERT INTO Calendar (StaffID, ProjectID, ReminderDate, ReminderTitle, ReminderContent) VALUES
(1, '1', '2023-05-01', 'Reminder 1', 'Content 1'),
(2, '2', '2023-06-01', 'Reminder 2', 'Content 2'),
(3, '3', '2023-07-01', 'Reminder 3', 'Content 3'),
(4, '4', '2023-08-01', 'Reminder 4', 'Content 4'),
(5, '5', '2023-09-01', 'Reminder 5', 'Content 5'),
(6, '6', '2023-10-01', 'Reminder 6', 'Content 6'),
(7, '7', '2023-11-01', 'Reminder 7', 'Content 7'),
(8, '8', '2023-12-01', 'Reminder 8', 'Content 8'),
(9, '9', '2024-01-01', 'Reminder 9', 'Content 9');

-- Insert into Documents
INSERT INTO Documents (StaffID, LaborContract, OtherContract, DepartmentID, Degree) VALUES
(1, 'Labor Contract 1', 'Other Contract 1', '1', 'Degree 1'),
(2, 'Labor Contract 2', 'Other Contract 2', '1', 'Degree 2'),
(3, 'Labor Contract 3', 'Other Contract 3', '2', 'Degree 3'),
(4, 'Labor Contract 4', 'Other Contract 4', '3', 'Degree 4'),
(5, 'Labor Contract 5', 'Other Contract 5', '4', 'Degree 5'),
(6, 'Labor Contract 6', 'Other Contract 6', '5', 'Degree 6'),
(7, 'Labor Contract 7', 'Other Contract 7', '5', 'Degree 7'),
(8, 'Labor Contract 8', 'Other Contract 8', '6', 'Degree 8'),
(9, 'Labor Contract 9', 'Other Contract 9', '7', 'Degree 9');

-- Insert into Communication
INSERT INTO Communication (Reply, PostID, StaffID) VALUES
('Reply 1', 1, 1),
('Reply 2', 2, 2),
('Reply 3', 3, 3),
('Reply 4', 4, 4),
('Reply 5', 5, 5),
('Reply 6', 6, 6),
('Reply 7', 7, 7),
('Reply 8', 8, 8),
('Reply 9', 9, 9);

-- Insert into Post
INSERT INTO Post (StaffID, Post, DateTime, ReplyID) VALUES
(1, 'Post 1', '2023-07-01 10:00:00', 1),
(2, 'Post 2', '2023-08-01 11:00:00', 2),
(3, 'Post 3', '2023-09-01 12:00:00', 3),
(4, 'Post 4', '2023-10-01 13:00:00', 4),
(5, 'Post 5', '2023-11-01 14:00:00', 5),
(6, 'Post 6', '2023-12-01 15:00:00', 6),
(7, 'Post 7', '2024-01-01 16:00:00', 7),
(8, 'Post 8', '2024-02-01 17:00:00', 8),
(9, 'Post 9', '2024-03-01 18:00:00', 9);

-- Insert into Payroll
INSERT INTO Payroll (StaffID, Salary, OthereFee, Bonus, StartDay, EndDay) VALUES
(1, 5000, 200, 500, '2023-01-01', '2023-01-31'),
(2, 6000, 300, 600, '2023-02-01', '2023-02-28'),
(3, 7000, 400, 700, '2023-03-01', '2023-03-31'),
(4, 8000, 500, 800, '2023-04-01', '2023-04-30'),
(5, 9000, 600, 900, '2023-05-01', '2023-05-31'),
(6, 10000, 700, 1000, '2023-06-01', '2023-06-30'),
(7, 11000, 800, 1100, '2023-07-01', '2023-07-31'),
(8, 12000, 900, 1200, '2023-08-01', '2023-08-31'),
(9, 13000, 1000, 1300, '2023-09-01', '2023-09-30');

-- Insert into Events
INSERT INTO Events (EventName, EventDate, EventContent) VALUES
('Event 1', '2023-09-01', 'Event Content 1'),
('Event 2', '2023-10-01', 'Event Content 2'),
('Event 3', '2023-11-01', 'Event Content 3'),
('Event 4', '2023-12-01', 'Event Content 4'),
('Event 5', '2024-01-01', 'Event Content 5'),
('Event 6', '2024-02-01', 'Event Content 6'),
('Event 7', '2024-03-01', 'Event Content 7'),
('Event 8', '2024-04-01', 'Event Content 8'),
('Event 9', '2024-05-01', 'Event Content 9');

-- Insert into Notices
INSERT INTO Notices (NoticeTitle, NoticeDate, NoticeContent) VALUES
('Notice 1', '2023-11-01', 'Notice Content 1'),
('Notice 2', '2023-12-01', 'Notice Content 2'),
('Notice 3', '2024-01-01', 'Notice Content 3'),
('Notice 4', '2024-02-01', 'Notice Content 4'),
('Notice 5', '2024-03-01', 'Notice Content 5'),
('Notice 6', '2024-04-01', 'Notice Content 6'),
('Notice 7', '2024-05-01', 'Notice Content 7'),
('Notice 8', '2024-06-01', 'Notice Content 8'),
('Notice 9', '2024-07-01', 'Notice Content 9');

-- Insert into StaffInfo
INSERT INTO StaffInfo (Gender, CCCD, Position, Birthplace, Nationality, Nation, Languages, CurrentAddress, DateOfJoining, WorkStatus) VALUES
('Male', 123456, 'Manager', 'City A', 'Country A', 'Nation A', 'English', 'Address A', '2023-01-01', 'Active'),
('Female', 654321, 'Developer', 'City B', 'Country B', 'Nation B', 'English', 'Address B', '2023-02-01', 'Active'),
('Male', 987654, 'Analyst', 'City C', 'Country C', 'Nation C', 'English', 'Address C', '2023-03-01', 'Active'),
('Female', 345678, 'Designer', 'City D', 'Country D', 'Nation D', 'English', 'Address D', '2023-04-01', 'Active'),
('Male', 876543, 'Engineer', 'City E', 'Country E', 'Nation E', 'English', 'Address E', '2023-05-01', 'Active'),
('Female', 234567, 'Consultant', 'City F', 'Country F', 'Nation F', 'English', 'Address F', '2023-06-01', 'Active'),
('Male', 765432, 'Technician', 'City G', 'Country G', 'Nation G', 'English', 'Address G', '2023-07-01', 'Active'),
('Female', 123765, 'Coordinator', 'City H', 'Country H', 'Nation H', 'English', 'Address H', '2023-08-01', 'Active'),
('Male', 654123, 'Supervisor', 'City I', 'Country I', 'Nation I', 'English', 'Address I', '2023-09-01', 'Active');

-- Insert into Checkin
INSERT INTO Checkin (StaffID, DateOfCheckIn, NumberOfWorkDay, NumberOfDayOff, NumberOfLate) VALUES
(1, '2023-01-01', 20, 5, 2),
(2, '2023-02-01', 18, 4, 3),
(3, '2023-03-01', 22, 3, 1),
(4, '2023-04-01', 21, 2, 4),
(5, '2023-05-01', 19, 6, 5),
(6, '2023-06-01', 23, 1, 2),
(7, '2023-07-01', 20, 4, 3),
(8, '2023-08-01', 21, 3, 1),
(9, '2023-09-01', 22, 2, 4);

-- Insert into Login
INSERT INTO Login (StaffID, Username, Password) VALUES
(1, 'john.doe', 'password1'),
(2, 'jane.smith', 'password2'),
(3, 'mike.brown', 'password3'),
(4, 'emily.davis', 'password4'),
(5, 'sarah.wilson', 'password5'),
(6, 'david.lee', 'password6'),
(7, 'chris.kim', 'password7'),
(8, 'anna.taylor', 'password8'),
(9, 'james.anderson', 'password9');

-- Insert into Request
INSERT INTO Request (StaffID, AdminID, Time, DepartmentID, RequestType, RequestTitle, RequestContent, RequestState) VALUES
(1, 1, NOW(), 1, 'Leave Request', 'Annual Leave', 'Request for annual leave approval', 'Pending'),
(2, 2, NOW(), 2, 'Expense Claim', 'Travel Expenses', 'Claim for travel expenses reimbursement', 'Approved'),
(3, 3, NOW(), 3, 'Training Request', 'Professional Development', 'Request for attending a training program', 'Rejected'),
(4, 4, NOW(), 4, 'Equipment Request', 'New Laptop', 'Request for a new laptop for work', 'Pending'),
(5, 5, NOW(), 5, 'Leave Request', 'Sick Leave', 'Request for sick leave approval', 'Approved'),
(6, 6, NOW(), 6, 'Expense Claim', 'Meal Expenses', 'Claim for meal expenses reimbursement', 'Pending'),
(7, 7, NOW(), 7, 'Training Request', 'Conference Attendance', 'Request for attending a conference', 'Approved'),
(8, 8, NOW(), 8, 'Equipment Request', 'Office Chair', 'Request for a new office chair', 'Pending');

-- Insert into auth
INSERT INTO Auth (AdminID, Username, Password) VALUES
(1, 'admin1', 'password1'),
(2, 'admin2', 'password2'),
(3, 'admin3', 'password3'),
(4, 'admin4', 'password4'),
(5, 'admin5', 'password5'),
(6, 'admin6', 'password6'),
(7, 'admin7', 'password7'),
(8, 'admin8', 'password8');

INSERT INTO Admin (AuthID, Email) VALUES
(1, 'admin1@example.com'),
(2, 'admin2@example.com'),
(3, 'admin3@example.com'),
(4, 'admin4@example.com'),
(5, 'admin5@example.com'),
(6, 'admin6@example.com'),
(7, 'admin7@example.com'),
(8, 'admin8@example.com');

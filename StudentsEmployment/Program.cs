using StudentsEmployment;


var builder = WebApplication.CreateBuilder(args);

builder.ConfigureServices();

var app = builder.Build();

app.AddMiddlewares(builder.Environment);

app.Run();

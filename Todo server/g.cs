using TodoApi;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);







);

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 
var app = builder.Build();


app.UseSwagger();  
app.UseSwaggerUI
(c =>
{
    
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");;
    c.RoutePrefix = string.Empty;
});

app.MapGet("/items", async(ToDoDbContext db) =>{return await db.Items.ToListAsync();} );
app.MapPost("items/", (Item item, ToDoDbContext db) => 
{
    db.Items.Add(item);
    db.SaveChanges(); 
    return Results.Created($"/{item.Id}", item); 
});
app.MapPut("/items/{id}", (int id, ToDoDbContext db, Item newItem) =>
{
    var it = db.Items.Find(id);
    if (it == null) return Results.NotFound();
    else
    {
        it.Name = newItem.Name;
        it.IsComplete = newItem.IsComplete;
        db.SaveChanges();
        return Results.Ok(it);
    }
});

app.MapDelete("/items/{id}", (int id, ToDoDbContext db) =>
{
    var item = db.Items.Find(id);
    if (item == null) return Results.NotFound();
    db.Items.Remove(item);
    db.SaveChanges();
    return Results.NoContent();
});

app.MapGet("/",()=>"ToDoApi server is runing");
app.Run();
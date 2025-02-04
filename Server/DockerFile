
FROM mcr.microsoft.com/dotnet/aspnet:7.0.7 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Set the environment variable for ASP.NET Core URLs
ENV ASPNETCORE_URLS=http://+:80

# Use the official SDK image for .NET 7.0.304 for building the application
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:7.0.304 AS build
ARG configuration=Release
WORKDIR /src
COPY ["TodoApi.csproj", "./"]
RUN dotnet restore "TodoApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TodoApi.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "TodoApi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoApi.dll"]

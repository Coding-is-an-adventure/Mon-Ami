#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Mon-Ami.API/Mon-Ami.API.csproj", "Mon-Ami.API/"]
RUN dotnet restore "Mon-Ami.API/Mon-Ami.API.csproj"
COPY . .
WORKDIR "/src/Mon-Ami.API"
RUN dotnet build "Mon-Ami.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Mon-Ami.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mon-Ami.API.dll"]
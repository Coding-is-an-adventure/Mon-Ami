using API.Application.Activities;
using API.Application.Activities.DTOs;
using API.Application.ErrorHandlers;
using API.Persistence;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Mon_Ami.Test
{
    public class ErrorHandlerTests
    {
        private Details.Handler _handler;
        private IMapper _mapper;

        public ErrorHandlerTests()
        {
            Setup();
        }

        private void Setup()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "testDB")
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
                .Options;

            var context = new DataContext(options);

            if(_mapper == null)
            {
                var mappingConfiguration = new MapperConfiguration(configuration => 
                {
                    configuration.AddProfile(new MappingProfile());
                });
                _mapper = mappingConfiguration.CreateMapper();
            }
            _handler = new Details.Handler(context, _mapper);
        }

        [Fact]
        public async Task DetailsHandler_EntityNonExistant_ReturnsRestException()
        {
            //Arrange
            CancellationToken token = new CancellationToken();
            var query = new Details.Query
            {
                Id = Guid.NewGuid()
            };

            //Act

            //Assert
            await Assert.ThrowsAsync<RestException>(() => _handler.Handle(query, token));
        }
    }
}

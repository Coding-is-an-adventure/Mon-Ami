using API.Application.Activities;
using API.Application.ErrorHandlers;
using API.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Mon_Ami.Test
{
    public class ErrorHandlerTests
    {
        private Details.Handler _handler;

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
            _handler = new Details.Handler(context);
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

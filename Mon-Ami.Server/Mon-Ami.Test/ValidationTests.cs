using System;
using Xunit;
using FluentValidation.TestHelper;
using API.Application.Activities;
using Mon_Ami.API.Models;

namespace Mon_Ami.Test
{
    public class ValidationTests
    {
        private Create.CommandValidator _validator;

        public ValidationTests()
        {
            Setup();
        }

        private void Setup()
        {
            _validator = new Create.CommandValidator();
        }

        [Fact]
        public void Title_Empty_ReturnsFalse()
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            //Act

            //Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.Category, model.Category);
        }

        [Theory]
        [InlineData("past activity")]
        [InlineData("future activity")]
        [InlineData("ladies night")]
        [InlineData("Restaurant Di Perla")]
        [InlineData("The Hobbit: The Battle of the Five Armies")]
        [InlineData("Roadtrip")]
        public void Title_Valid_ReturnsTrue(string title)
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel
            {
                Title = title
            };

            //Act

            //Assert
            validator.ShouldNotHaveValidationErrorFor(activity => activity.Title, model.Title);
        }

        [Fact]
        public void Description_Empty_ReturnsFalse()
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            //Act

            //Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.Description, model.Description);
        }

        [Theory]
        [InlineData("Listening to opera songs.")]
        [InlineData("A ladies nights, no men allowed!")]
        [InlineData("Visiting the famous 5 star restaurant: A l'Huîtrière")]
        [InlineData("At night the Eiffel Tower lights up.")]
        [InlineData("Going on a journey starting in The Netherlands and ending in South-Africa to raise money for a charity.")]
        public void Description_Valid_ReturnsTrue(string description)
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel
            {
                Description = description
            };

            //Act

            //Assert
            validator.ShouldNotHaveValidationErrorFor(activity => activity.Description, model.Description);
        }

        [Fact]
        public void Category_Empty_ReturnsFalse()
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            //Act

            //Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.Category, model.Category);
        }

        [Theory]
        [InlineData("music")]
        [InlineData("culture")]
        [InlineData("drinks")]
        [InlineData("food")]
        [InlineData("film")]
        [InlineData("travel")]
        public void Category_Valid_ReturnsTrue(string category)
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel
            {
                Category = category
            };

            //Act

            //Assert
            validator.ShouldNotHaveValidationErrorFor(activity => activity.Category, model.Category);
        }

        [Fact]
        public void Date_Empty_ReturnsFalse()
        {
            // Arrange 
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            // Act

            // Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.Date, model.Date);
        }

        //[Theory]
        ////[InlineData(new DateTime(2017, 1, 18))]
        //[InlineData("")]
        //public void Date_Valid_ReturnsTrue(DateTime date)
        //{
        //    // Arrange 
        //    var validator = _validator;
        //    ActivityModel model = new ActivityModel
        //    {
        //        Date = date
        //    };


        //    // Act

        //    // Assert
        //    validator.ShouldNotHaveValidationErrorFor(activity => activity.Date, model.Date);
        //}

        [Fact]
        public void Venue_Empty_ReturnsFalse()
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            //Act

            //Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.Venue, model.Venue);
        }

        [Theory]
        [InlineData("Amsterdam")]
        [InlineData("Den Hague")]
        [InlineData("London")]
        [InlineData("Lille")]
        [InlineData("Bordeaux")]

        public void City_Valid_ReturnsTrue(string city)
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel
            {
                City = city
            };

            //Act

            //Assert
            validator.ShouldNotHaveValidationErrorFor(activity => activity.City, model.City);
        }

        [Fact]
        public void City_Empty_ReturnsFalse()
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel();

            //Act

            //Assert
            validator.ShouldHaveValidationErrorFor(activity => activity.City, model.City);
        }

        [Theory]
        [InlineData("Big Ben")]
        [InlineData("The Great Wall")]
        [InlineData("London Eye")]
        [InlineData("Burj Khalifa")]
        [InlineData("Eiffel Tower at night")]
        [InlineData("Roadtrip")]

        public void Venue_Valid_ReturnsTrue(string venue)
        {
            //Arrange
            var validator = _validator;
            ActivityModel model = new ActivityModel
            {
                Venue = venue
            };

            //Act

            //Assert
            validator.ShouldNotHaveValidationErrorFor(activity => activity.Venue, model.Venue);
        }
    }
}

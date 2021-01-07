using FluentValidation;

namespace API.Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            IRuleBuilder<T, string> options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("The password must be at least 6 characters long")
                .MaximumLength(25).WithMessage("The password cannot exceed 25 characters")
                .Matches("[A-Z]").WithMessage("The password must contain 1 uppercase letter.")
                .Matches("[a-z]").WithMessage("The password must contain 1 lowercase letter.")
                .Matches("[0-9]").WithMessage("The password must contain a number")
                .Matches("[^a-zA-Z0-9]").WithMessage("The password must contain a non alpahnumeric");

            return options;
        }
    }
}

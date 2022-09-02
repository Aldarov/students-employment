namespace StudentsEmployment.ExtensionMethods
{
    public static class  HTTPContextExtension
    {
        public static int GetEmploymentId(this HttpContext context)
        {
            var res = context.User.Claims
                .Where(x => x.Type == "EmploymentId")
                .Select(x => Convert.ToInt32(x.Value))
                .FirstOrDefault();

            if (res == 0)
                throw new Exception("Not found identity claims: EmploymentId");

            return res;
        }
    }
}

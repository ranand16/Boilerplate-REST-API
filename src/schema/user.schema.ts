import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required!"
        }),
        email: string({
            required_error: "Email is required!"
        }).email("Not a valida email id"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short should be 6 characters!"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        })
    }).refine((data)=>data.password === data.passwordConfirmation, {
        message: "Passowrds do not match",
        path: ["passwordConfirmation"]
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;
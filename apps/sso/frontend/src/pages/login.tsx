import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from "@/components/ui/sheet.tsx";
import {appendSSOAPIUrl} from "@/lib/api.ts";


const loginFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"}),
    password: z.string().min(8,{message: "Password must be at least 8 characters long"}),
});

const Login = () => {

    const navigate = useNavigate();
    const {toast} = useToast();

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit:SubmitHandler<z.infer<typeof loginFormSchema>> = async (data: z.infer<typeof loginFormSchema>) => {

        const response = await fetch(appendSSOAPIUrl('/auth/login'), {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err.message,
                    duration: 5000,
                    variant:"destructive"
                });
            });

        if(response?.token){
            localStorage.setItem("token", response.token);
            navigate("/");
        }

    }


    return (
        <main
            className="flex flex-col items-center justify-center w-full h-screen p-4 dark:bg-gray-800"
        >
            <Card
                className={"w-full max-w-md p-4 shadow-lg rounded-lg"}
            >
                <CardTitle
                    className={"text-center text-2xl font-bold font-serif "}
                >
                    <img src="https://www.newedge.bt/storage/logo/logonewedge_1599029039.png" alt="new edge technologies pvt ltd"/>
                </CardTitle>
                <Separator className={"my-4"} />
                <Form {...loginForm} >
                    <CardContent>
                        <form
                            className={"flex flex-col w-full space-y-4"}
                            onSubmit={loginForm.handleSubmit(onSubmit)}>
                            <FormField
                                control={loginForm.control}
                                name={"email"}
                                render={
                                    ({field}) => (
                                        <FormItem>
                                            <FormLabel
                                                className="text-gray-800 dark:text-gray-200 pl-2"
                                            >Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={"text-gray-800 dark:text-gray-200"}
                                                    placeholder="enter email address" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.email && (
                                                <FormMessage
                                                    className={"text-red-500"}
                                                >
                                                    {loginForm.formState.errors.email.message}
                                                </FormMessage>
                                            )}

                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={loginForm.control}
                                name={"password"}
                                render={
                                    ({field}) => (
                                        <FormItem>
                                            <FormLabel
                                                className="text-gray-800 dark:text-gray-200 pl-2"
                                            >Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={"text-gray-800 dark:text-gray-200"}
                                                    placeholder="enter password" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.password && (
                                                <FormMessage
                                                    className={"text-red-500"}
                                                >
                                                    {loginForm.formState.errors.password.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )
                                }
                            />
                        </form>
                    </CardContent>
                    <CardFooter
                        className={"flex flex-col w-full"}
                    >
                        <Button
                            className="w-full"
                            type="submit" onClick={loginForm.handleSubmit(onSubmit)}>Login</Button>

                        {/** forgot password **/}
                        <Sheet>
                            <SheetTrigger
                                className="mt-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Forgot password?
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <h2 className="text-xl font-bold">Forgot password?</h2>
                                </SheetHeader>
                                <SheetDescription>
                                    <p className="text-gray-500">
                                        Enter your email address below and we'll send you a link to reset your password.
                                    </p>
                                </SheetDescription>
                                <form className="flex flex-col w-full space-y-4">
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email address" />
                                        </FormControl>
                                    </FormItem>
                                    <Button type="submit">Send reset link</Button>
                                </form>
                            </SheetContent>
                        </Sheet>
                    </CardFooter>
                </Form>
            </Card>
        </main>
    )
}

export default Login;
import React from 'react'

function LoginForm() {
    return (
        <>
            <div className="loginFormSection">
                <div className="loginFormTitle">
                    <span>Login</span>
                </div>
                <div className="loginFormField">
                    <form action="">
                        <div className="inputField">
                            <input 
                                type="text" 
                                placeholder='Enter your email Address'
                            />
                            <input 
                                type="password" 
                                placeholder='Enter your password'
                            />
                        </div>
                        <div className="checkBoxField">
                            <div className="rememberMeSection">
                                
                            </div>
                            <div className="forgorPasswordSection">
                                <Link>Forgot Password?</Link>
                            </div>
                        </div>
                        <div className="buttonField">
                            <Button>Log in to My Account</Button>

                            <Button>Log in with Google</Button>    
                        </div>
                        <div className="bottomText">
                            <span>New to Pinklet? <Link>Create an Account</Link></span>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default LoginForm
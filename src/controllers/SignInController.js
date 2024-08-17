import { SignInProvider } from '../hooks/SignInContext';
import SignIn from '../views/SignIn';

const SignInController = () => {
  return (
    <SignInProvider>
      <SignIn />
    </SignInProvider>
  );
};

export default SignInController;

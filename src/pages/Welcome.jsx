// import SmileyOneIcon from '../assets/svg/smileyOneIcon.svg?react';
// import SmileyTwoIcon from '../assets/svg/smileyTwoIcon.svg?react';
// import SmileyThreeIcon from '../assets/svg/smileyThreeIcon.svg?react';
import { WelcomeAlmostThere } from "../components/WelcomeAlmostThere";
import { WelcomeCompleted } from "../components/WelcomeCompleted";
import { WelcomeGetStarted } from "../components/WelcomeGetStarted";
import { WelcomeHeader } from "../components/WelcomeHeader";


const Welcome = () => {
  
  return (
   <div className="welcomePageParent">
    <WelcomeHeader />
    <WelcomeGetStarted />
    {/* <WelcomeAlmostThere /> */}
    {/* <WelcomeCompleted /> */}
   </div>
    
   
  );
}

export default Welcome;


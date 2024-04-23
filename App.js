import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomePage from "./Login&RegisterPages/WelcomePage";
import LoginPage from "./Login&RegisterPages/LoginPage";
import HomePage from "./HomePage&Navs/HomePage";
import MenuPage from "./HomePage&Navs/MenuPage";
import SignUpPage from "./Login&RegisterPages/SignUpPage";
import useAuth from "./hooks/useAuth";
import CommingSoon from "./OtherPages/CommingSoon";
import SubjectPickPage from "./Login&RegisterPages/SubjectPickPage";
import NamePage from "./Login&RegisterPages/NamePage";
import LoadingScreen from "./Login&RegisterPages/LoadingScreen";
import UsernamePage from "./Login&RegisterPages/UsernamePage";
import SetupedPage from "./Login&RegisterPages/SetupedPage";
import IntroPage from "./Login&RegisterPages/IntroPage";
import UserProfilePage from "./OtherPages/UserProfilePage";
import GlobalChatPage from "./HomePage&Navs/GlobalChatPage";
import PeopleSelectionPage from "./HomePage&Navs/PeopleSelectionPage";
import PeoplePage from "./HomePage&Navs/PeoplePage";
import CommingSoon2 from "./OtherPages/CommingSoon2";
import SupportPage from "./OtherPages/SupportPage";
import Pomodoro from "./LevelPages/Pomodoro";
import Pomodoro2 from "./LevelPages/Pomodoro2";
import Timer from "./LevelPages/Timer";
import ActiveRecall from "./LevelPages/ActiveRecall";
import ActiveRecall2 from "./LevelPages/ActiveRecall2";
import SpacedRepetition from "./LevelPages/SpacedRepetition";
import TrafficLight from "./LevelPages/TrafficLight";
import LeitnerSystem from "./LevelPages/LeitnerSystem";
import LeitnerSystem2 from "./LevelPages/LeitnerSystem2";
import BestUsers from "./HomePage&Navs/BestUsers";

const Stack = createStackNavigator();

function App() {
  const { user, isLoading } = useAuth();

  // Assuming isLoading is true during initial app loading
  // and false otherwise. Adjust based on your useAuth hook's behavior.
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Stack for authenticated users
          <>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="MenuPage" component={MenuPage} />
            <Stack.Screen name="SubjectPickPage" component={SubjectPickPage} />
            <Stack.Screen name="NamePage" component={NamePage} />
            <Stack.Screen name="UsernamePage" component={UsernamePage} />
            <Stack.Screen name="SetupedPage" component={SetupedPage} />
            <Stack.Screen name="IntroPage" component={IntroPage} />
            <Stack.Screen name="UserProfilePage" component={UserProfilePage} />
            <Stack.Screen name="GlobalChatPage" component={GlobalChatPage} />
            <Stack.Screen
              name="PeopleSelectionPage"
              component={PeopleSelectionPage}
            />
            <Stack.Screen name="PeoplePage" component={PeoplePage} />
            <Stack.Screen name="CommingSoon2" component={CommingSoon2} />
            <Stack.Screen name="SupportPage" component={SupportPage} />
            <Stack.Screen name="Pomodoro" component={Pomodoro} />
            <Stack.Screen name="Pomodoro2" component={Pomodoro2} />
            <Stack.Screen name="Timer" component={Timer} />
            <Stack.Screen name="ActiveRecall" component={ActiveRecall} />
            <Stack.Screen name="ActiveRecall2" component={ActiveRecall2} />
            <Stack.Screen
              name="SpacedRepetition"
              component={SpacedRepetition}
            />
            <Stack.Screen name="TrafficLight" component={TrafficLight} />
            <Stack.Screen name="LeitnerSystem" component={LeitnerSystem} />
            <Stack.Screen name="LeitnerSystem2" component={LeitnerSystem2} />
            <Stack.Screen name="BestUsers" component={BestUsers} />

            {/* Add other authenticated user screens here */}
          </>
        ) : (
          // Stack for unauthenticated users
          <>
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            {/* The LoadingScreen should be used within the SignUpPage logic for transitioning */}
            <Stack.Screen name="SubjectPickPage" component={SubjectPickPage} />
            <Stack.Screen name="NamePage" component={NamePage} />
            <Stack.Screen name="CommingSoon" component={CommingSoon} />
            <Stack.Screen name="UsernamePage" component={UsernamePage} />
            <Stack.Screen name="SetupedPage" component={SetupedPage} />
            <Stack.Screen name="IntroPage" component={IntroPage} />
            {/* Add other unauthenticated user screens here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

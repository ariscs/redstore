import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './default.scss';

import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

//Layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import SignIn from './pages/SignIn';

const App = props => {
    const { setCurrentUser, currentUser } = props;

    useEffect(() => {
        const authListener = auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });

        return () => {
            authListener();
        };
    }, []);

    return (
        <div className="App">
            <ReactNotification />
            <Switch>
                <Route exact path="/" render={() => (
                    <HomepageLayout>
                        <Homepage />
                    </HomepageLayout>
                )} />
                <Route path="/registration" render={() => (
                    <MainLayout>
                        <Registration />
                    </MainLayout>
                )} />
                <Route path="/signin" render={() => (
                    <MainLayout>
                        <SignIn />
                    </MainLayout>
                )} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

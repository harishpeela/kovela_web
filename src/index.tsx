import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import ProtectedRoute from './util/protectedRoute';
import Home from './components/portal/home';
import ProfileMaster from './components/portal/profile-master/profile-master';

const root = ReactDOM.createRoot( 
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
		<HashRouter basename={'/'}>
			<Routes>
				<Route path='/auth' element={<Auth />}>
					<Route path='login' element={<Login />} />
				</Route>
				<Route path="/" element={<App />}>
					<Route path='' element={
						<ProtectedRoute>
							<ProfileMaster />
						</ProtectedRoute>
					} />

          <Route path='/profile-master' element={
            <ProtectedRoute>
              <ProfileMaster />
            </ProtectedRoute>
          } />
				  </Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

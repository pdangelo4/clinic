# clinic

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Third Party Features] (#Third-Party-Features)
* [Setup](#setup)


## General info

The purpose of this application is to allow patients of private practive clinics to schedule appointments, 
write messages, and even video chat with their providers.

This application consists of Authentication, Socket chats, webchats, and third party calendar implementation.


## Technologies

Technoogies used:  Express, EJS, Sequelize


Four models are in use includeing: Chat, Appointment, Patient, and Doctor

![Data Models](https://i.imgur.com/VdzJmvh.png)


Pages:

Home: Landing page for the app

Sign Up: allows user to sign up for an account

Login: allows user to log in to gain access to other features

Appointment: page displaying callendar to schedule an appointment

WebChat: page allowing users to have a live video chat with an end user (doctor)

Message: allows users to message with each other, primarily meant for doctor/patient communication
         (note: when two users are chatting, if one user receives a message from someone outside the chat, the message will be 
         visible only to the recipient and not the other user present in the chat)
         
Logout: user leaves session and is redirected to home page


## Third-Party-Features

Calendar: dhtmlxScheduler is a JavaScript event calendar that allows you to add a 
Google-like scheduler to your web app or website. https://www.npmjs.com/package/dhtmlx-scheduler

![Calendar](https://i.imgur.com/VRv3rRT.png)

webRTC: PubNub IS the Signaling Protocol Service. Once signaling has taken place, video/audio/data is 
streamed directly between clients, using WebRTC's PeerConnection API. This peer-to-peer direct connection 
allows you to stream high-bandwidth robust data, such as video.



CRUD opperations:

Create used in both appointment calendar and the socket chat to create events/appointments and chat messages.

Read used as well in appointment calendar and socket chat to pull events and messages

Update implemented in the calendar appointment where an event can be updated for name and time
which will be reflected in the appointment table.

Delete: implemented in the calendar appointment where an appointment can be deleted


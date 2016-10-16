## Spring Boot: user notifications with web socket ##

This example will shows how to send notifications, via web socket, to specific logged-in users.

Could be useful, for example, if you are trying to implement a real-time user notification system.

### Build and run

#### Configurations

Open the `application.properties` file and set your own configurations.

#### Prerequisites

- Java 8
- Maven > 3.0

#### From terminal

Go on the project's root folder, then type:

    $ mvn spring-boot:run

#### From Eclipse (Spring Tool Suite)

Import as *Existing Maven Project* and run it as *Spring Boot App*.


### Usage

- Launch the application and login into it with one of the following credentials (Username / Password):
    * UserA / UserA
    * UserB / UserB
    * UserC / UserC
- Keep a window open on the index url `"/"` and open another window on the url
  `"/notifications"` to launch the web socket connection and recieve messages.
- Click the button to send a fake action: **only UserA** will be notified of
  the action on the web socket channel. Other user do not receive the notification.
- Open a new private/incognito windows of your web browser and login 
  with a different user to see what happen with two users connected. Again, only UserA will be notified (no any other user).

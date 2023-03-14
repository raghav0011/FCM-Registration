# FCM Internal Service


# This service is used to store the data of the user who have logged in

###Technologies used
Node js
Express js
Mongo DB
Docker

### GET Request URL of service
  >(http://localhost:3000/fcm/internal/:ownership)
  
  - In this case we would get all the user data of the collection according to the ownership name we have set
  
### GET Request URL of service using username
  >(http://localhost:3000/fcm/internal/:ownership/:username)
  - In this case we would only get the individual user data of the collection according to the ownership name and username we have set

### POST Request URL to store data
  >(http://localhost:3000/fcm/internal/add/worldlink)

  - In this case worldlink is ownership of a company name, which concatenate with fcm/internal/add and become a collection name and then allow user to store data
  in that particular collection.
  
### DELETE Request URL to delete data
  >(http://localhost:3000/fcm/internal/remove/:username/:ownership)

  - In this case we can set the name of the username and the collection name from which the user would be deleted.
### UPDATE Request URL to update data
  >(http://localhost:3000/fcm/internal/update/:username/:ownership)

  - In this case we can set the name of the username and the collection name from which the user would be updated.

### Example

  POST request URL
  >(http://localhost:3000/fcm/internal/add/worldlink)

      Request
      '''
        {
            "client_username": "raghav",
            "device_id": "a374-29e8-42d4-97c4-4f84",
            "registration_id":"123345",
            "ip":"192.168.10.1",
            "status":"1",
            "app_version":"internal.v2",
            "app_version_code":"168.192",
            "device_os":"Android",
            "device_name":"google pixel"
        }   
      Response
        {
            "message": "success",
            "error": false,
            "code": 200,
            "results": {
                "client_username": "raghav",
                "device_id": "a374-29e8-42d4-97c4-4f84",
                "device_name": "google pixel",
                "registration_id": "123345",
                "ip": "192.168.10.1",
                "status": "1",
                "app_version": "internal.v2",
                "app_version_code": "168.192",
                "device_os": "Android",
                "_id": "64104e4901e11d0b2902e537",
                "createdAt": "2023-03-14T10:36:57.544Z",
                "updatedAt": "2023-03-14T10:36:57.544Z",
                "__v": 0
            }
        }
      '''
      
### GET Request URL of all USER
  >(http://localhost:3000/fcm/internal/worldlink)
  
    Response
      '''
        {
    "message": "success",
    "error": false,
    "code": 200,
    "results": [
        {
            "device_id": "123",
            "_id": "64104e80959dc52dbe86c01f",
            "registration_id": "111",
            "client_username": "raghav",
            "ip": "192.168.1.259",
            "status": "2",
            "app_version": "220",
            "app_version_code": "2.2.2",
            "device_os": "android",
            "device_name": "demo",
            "createdAt": "2023-03-14T10:37:53.466Z",
            "updatedAt": "2023-03-14T10:37:53.466Z",
            "__v": 0
        }
              ]
          }
      '''
    
### GET Request URL using username
  >(http://localhost:3000/fcm/internal/worldlink/raghav)
  
    Response
      '''
        {
    "message": "success",
    "error": false,
    "code": 200,
    "results": [
        {
            "device_id": "123",
            "_id": "64104e80959dc52dbe86c01f",
            "registration_id": "111",
            "client_username": "raghav",
            "ip": "192.168.1.259",
            "status": "2",
            "app_version": "220",
            "app_version_code": "2.2.2",
            "device_os": "android",
            "device_name": "demo",
            "createdAt": "2023-03-14T10:37:53.466Z",
            "updatedAt": "2023-03-14T10:37:53.466Z",
            "__v": 0
        }
              ]
          }
      '''
      
### UPDATE Request URL using username
  >(http://localhost:3000/fcm/internal/update/raghav/worldlink/)
  
    Request
      '''
        {
            "client_username": "updated",
            "device_id": "a374-29e8-42d4-97c4-4f84",
            "registration_id":"123345",
            "ip":"192.168.10.1",
            "status":"1",
            "app_version":"internal.v2",
            "app_version_code":"168.192",
            "device_os":"Android",
            "device_name":"google pixel"
        }
        Response
        {
            "message": "success",
            "error": false,
            "code": 200,
            "results": "raghav"
        }
      '''
      
### Delete Request URL using username
  >(http://localhost:3000/fcm/internal/remove/raghav/worldlink)
  
    Response
      '''
        {
            "message": "success",
            "error": false,
            "code": 200,
            "results": {
                "_id": "64105bce01e11d0b2902e56c",
                "client_username": "raghav",
                "device_id": "a374-29e8-42d4-97c4-4f84",
                "device_name": "google pixel",
                "registration_id": "123345",
                "ip": "192.168.10.1",
                "status": "1",
                "app_version": "internal.v2",
                "app_version_code": "168.192",
                "device_os": "Android",
                "createdAt": "2023-03-14T11:34:38.415Z",
                "updatedAt": "2023-03-14T11:34:38.415Z",
                "__v": 0
            }
        }
      '''


### Developer: Raghav GC

### Contact: raghavgc11@gmail.com

### Thank you

to use the app- 
1. git clone https://github.com/ashu1718/polling_app.git    //clone the repo
2. frontend- navigate to frontend -> npm i -> npm start  //port- 3000
3. backend- navigate to backend-
     a. activate the virtual env- .venv/scripts/activate
     b. run command- python manage.py runserver // port- 8000

about the app-
1. it has 3 models- survey, question and questionResponse
2. multiple endpoints to create, delete, close, save and take a survey.
3. in front end, libraries like surveyJs, npm are used.
4. login and signup page uses JWT token authorization with an auto access_token refresh mechanism.
5.  Toasters are also added for every endpoint for better user communication.

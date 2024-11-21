import { post, get } from 'aws-amplify/api';

export async function postUserScore() {
  try {
    const restOperation = post({
      apiName: 'api10c446c0',
      path: '/score',
      options: {
        body: {
          message: '2'
        }
      }
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('POST call succeeded');
    console.log(response);
  } catch (e) {
    console.log('POST call failed: ', JSON.parse(e.response.body));
  }
}


export async function getUserScore() {
  try {
    const restOperation = get({ 
      apiName: 'api10c446c0',
      path: '/score' 
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response);
  } catch (e) {
    console.log('GET call failed: ', JSON.parse(e.response.body));
  }
}
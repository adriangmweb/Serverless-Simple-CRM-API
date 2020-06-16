module.exports = (principalId, effect, resource) => {
  if (!effect || !resource) return null
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  return {
    principalId,
    policyDocument
  };
};
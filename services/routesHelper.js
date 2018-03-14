exports.allowOnly = function (accessLevel, callback) {
   return function checkUserRole(req, res) {
       if (!(accessLevel & req.user.role)) {
           res.sendStatus(403);
           return;
       }

       callback(req, res);
   }
};

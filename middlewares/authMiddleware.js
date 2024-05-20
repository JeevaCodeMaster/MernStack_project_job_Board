
import JWT from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Authentication failed: No token provided' });
//     }

//     const token = authHeader.split(' ')[1];
//     console.log(token);
//     try {
//         const payload = JWT.verify(token, process.env.JWT_SECRET);
//         console.log(payload);


//         if (!payload || !payload.userId) {
//             return res.status(401).json({ message: 'Authentication failed: Invalid token payload' });
//         }

//         req.user = { userId: payload.userId };

//     } catch (error) {
//         console.error('JWT verification error:', error);
//         return res.status(401).json({ message: 'Authentication failed: Invalid token' });
//     }
// };

// export default userAuth;


export const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);

        if (!payload || !payload.userId) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token payload' });
        }
// Correctly set req.user
        req.user = { userId: payload.userId }; 
        // console.log('Middleware userAuth: req.user:', req.user); 
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

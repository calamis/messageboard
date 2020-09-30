import dbConnect from '../../config/dbConnect';

dbConnect();

export default async (req, res) => {
    res.json({ test: 'test'});
}

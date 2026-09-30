import mongoose from 'mongoose';
import dns from 'node:dns';

const dnsServers = (process.env.MONGODB_DNS_SERVERS || '1.1.1.1,8.8.8.8')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

dns.setServers(dnsServers);

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> {console.log('Database connected')});

    await mongoose.connect(`${process.env.MONGODB_URI}/ResumeAnalyzer`);
}

export default connectDB;
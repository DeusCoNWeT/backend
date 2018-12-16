const request=require('supertest');

var server;

process.env.NODE_ENV="test";

describe('/api/components',() =>{
beforeEach(()=>{server =require('../index')})
afterEach(()=>{server.close();})

describe('GET /',()=>{
    it('should return all genres',async()=>{
        const res=await request(server).get('/api/components');
        expect(res.status).toBe(200);
    })
})
})
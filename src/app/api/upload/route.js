import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from 'uuid';


export async function POST(req) {
    const data = await req.formData();
    if (data.get('file')) {
        const file = data.get('file');

        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        })

        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uuid() + '.' + ext;

        const chuncks = [];
        for await (const chunk of file.stream()) {
            chuncks.push(chunk);
        }
        const buffer = Buffer.concat(chuncks);

        await s3Client.send(new PutObjectCommand({
            Bucket: 'maxiwang-food-ordering',
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer,
        }));

        return Response.json('http://maxiwang-food-ordering.s3.amazonaws.com/' + newFileName);

    }
    return Response.json(true);
}
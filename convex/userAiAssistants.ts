import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
    args:{
        records : v.any(),
        uid: v.id('users')
    },
    handler: async(ctx, args) =>{
        const insertedIds = await Promise.all(
            args.records.map(async (record: any) => 
                await ctx.db.insert("userAiAssistants", {
                    ...record,
                    uid: args.uid
            })
            )
        );
        return insertedIds;
    }
})

export const GetAllUserAssistants = query({
    args:{
        uid:v.id('users')
    },
    handler: async(convexToJson, args) =>{
        const result = await convexToJson.db.query("userAiAssistants").filter(q => q.eq(q.field("uid"), args.uid))
        .collect();

        return result;
    }
})
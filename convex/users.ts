// import { qu } from './../node_modules/convex/src/cli/codegen_templates/component_server';
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        picture: v.string()
    },
    handler: async (ctx, args) => {
        // If user already exists, return the user
        const user = await ctx.db.query('users')
            .filter(q => q.eq(q.field("email"), args.email))
            .collect();
        // New user Creation
        if(user?.length === 0){
            const data ={
               name: args.name,
               email: args.email,
               picture: args.picture,
               credits: 5000 
            }
            const result = await ctx.db.insert("users", data);
            return data
        } 
        return user[0];
    }

})
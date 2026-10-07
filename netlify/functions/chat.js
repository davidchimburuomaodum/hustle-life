// =========================================================
// HUSTLE LIFE — CHAT BACKEND
// Netlify Function + Supabase
// =========================================================

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);


// =========================================================
// RESPONSE HELPER
// =========================================================

function response(statusCode, data) {

    return {
        statusCode,

        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
                "Content-Type, Authorization",
            "Access-Control-Allow-Methods":
                "GET, POST, OPTIONS"
        },

        body: JSON.stringify(data)
    };
}


// =========================================================
// MAIN FUNCTION
// =========================================================

exports.handler = async function (event) {

    // -----------------------------------------------------
    // CORS
    // -----------------------------------------------------

    if (event.httpMethod === "OPTIONS") {

        return response(200, {
            success: true
        });

    }


    try {

        // =================================================
        // GET MESSAGES
        // =================================================

        if (event.httpMethod === "GET") {

            const params = event.queryStringParameters || {};

            const chatType = params.type || "public";

            const userId = params.user_id || null;

            const limit = Math.min(
                parseInt(params.limit || "50"),
                100
            );


            let query = supabase
                .from("messages")
                .select("*")
                .order("created_at", {
                    ascending: true
                })
                .limit(limit);


            // ---------------------------------------------
            // PUBLIC CHAT
            // ---------------------------------------------

            if (chatType === "public") {

                query = query
                    .eq("chat_type", "public");

            }


            // ---------------------------------------------
            // PRIVATE CHAT
            // ---------------------------------------------

            else if (chatType === "private") {

                const recipientId =
                    params.recipient_id;

                if (!userId || !recipientId) {

                    return response(400, {
                        success: false,
                        error:
                            "user_id and recipient_id are required"
                    });

                }


                query = query
                    .eq("chat_type", "private")
                    .or(
                        `and(sender_id.eq.${userId},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${userId})`
                    );

            }


            else {

                return response(400, {
                    success: false,
                    error: "Invalid chat type"
                });

            }


            const { data, error } = await query;


            if (error) {

                console.error(error);

                return response(500, {
                    success: false,
                    error: error.message
                });

            }


            return response(200, {
                success: true,
                messages: data || []
            });

        }


        // =================================================
        // SEND MESSAGE
        // =================================================

        if (event.httpMethod === "POST") {

            let body;

            try {

                body = JSON.parse(
                    event.body || "{}"
                );

            } catch {

                return response(400, {
                    success: false,
                    error: "Invalid JSON"
                });

            }


            const {
                sender_id,
                sender_name,
                recipient_id,
                message,
                chat_type = "public"
            } = body;


            // ---------------------------------------------
            // VALIDATION
            // ---------------------------------------------

            if (!sender_id) {

                return response(400, {
                    success: false,
                    error: "sender_id is required"
                });

            }


            if (!sender_name) {

                return response(400, {
                    success: false,
                    error: "sender_name is required"
                });

            }


            if (!message ||
                typeof message !== "string") {

                return response(400, {
                    success: false,
                    error: "Message is required"
                });

            }


            const cleanMessage =
                message.trim();


            if (!cleanMessage) {

                return response(400, {
                    success: false,
                    error: "Message cannot be empty"
                });

            }


            // Limit message size

            if (cleanMessage.length > 1000) {

                return response(400, {
                    success: false,
                    error:
                        "Message cannot exceed 1000 characters"
                });

            }


            // ---------------------------------------------
            // PRIVATE CHAT VALIDATION
            // ---------------------------------------------

            if (
                chat_type === "private" &&
                !recipient_id
            ) {

                return response(400, {
                    success: false,
                    error:
                        "recipient_id is required for private chat"
                });

            }


            // ---------------------------------------------
            // CREATE MESSAGE
            // ---------------------------------------------

            const newMessage = {

                sender_id,

                sender_name,

                recipient_id:
                    chat_type === "private"
                        ? recipient_id
                        : null,

                message:
                    cleanMessage,

                chat_type,

                created_at:
                    new Date().toISOString()

            };


            const { data, error } =
                await supabase
                    .from("messages")
                    .insert([newMessage])
                    .select()
                    .single();


            if (error) {

                console.error(error);

                return response(500, {
                    success: false,
                    error: error.message
                });

            }


            return response(201, {

                success: true,

                message: data

            });

        }


        // =================================================
        // METHOD NOT ALLOWED
        // =================================================

        return response(405, {

            success: false,

            error: "Method not allowed"

        });

    }


    catch (error) {

        console.error(
            "Chat backend error:",
            error
        );


        return response(500, {

            success: false,

            error: "Internal server error"

        });

    }

};

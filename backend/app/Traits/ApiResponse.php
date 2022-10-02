<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse{
    /**
     * @param string $message
     * @param $data
     * @return JsonResponse
     */
    function successfulResult(string $message, $data): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    /**
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */
    function failResult(string $message, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], $statusCode);
    }
}
